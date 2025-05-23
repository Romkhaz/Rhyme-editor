import React, { useState, useRef } from 'react';
import { syllabify } from 'syllables-ru';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

// Онлайн-редактор с подсчетом слогов и предложениями рифм на русском (RhymeBrain API) в зелёной теме
export default function TextEditor() {
    const editorRef = useRef(null);
    const [syllableCounts, setSyllableCounts] = useState([]);
    const [rhymes, setRhymes] = useState([]);
    const [showGreeting, setShowGreeting] = useState(false);

    const countSyllablesInLine = (line) => {
        if (!line.trim()) return 0;
        return line.trim().split(/\s+/).reduce((acc, word) => {
            const syls = syllabify(word);
            return acc + (syls ? syls.split('-').length : 0);
        }, 0);
    };

    const handleInput = () => {
        const txt = editorRef.current.innerText;
        const lines = txt.split('\n');
        const counts = lines.map(line => countSyllablesInLine(line));
        setSyllableCounts(counts);
    };

    const getSelectionWord = () => {
        const selection = window.getSelection();
        return selection ? selection.toString().trim() : '';
    };

    const fetchRhymes = async () => {
        const word = getSelectionWord();
        if (!word) return;
        try {
            const response = await fetch(
                `https://rhymebrain.com/talk?function=getRhymes&lang=ru&maxResults=10&word=${encodeURIComponent(word)}`
            );
            const data = await response.json();
            setRhymes(data.map(item => item.word));
        } catch (error) {
            console.error('Ошибка при получении рифм:', error);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto min-h-screen bg-green-900 text-green-100">
            <Card className="bg-green-800 text-green-100">
                <CardContent>
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleInput}
                        className="border border-green-700 bg-green-800 text-green-100 p-2 rounded h-48 overflow-y-auto focus:outline-none placeholder-green-500"
                        data-placeholder="Напишите здесь..."
                    />

                    <div className="mt-4 flex flex-wrap items-center space-x-4">
                        <Button variant="outline" onClick={fetchRhymes} className="border-green-600 text-green-100">
                            Предложить рифмы
                        </Button>
                        <Button variant="solid" onClick={() => setShowGreeting(true)} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
                            Показать приветствие
                        </Button>
                    </div>

                    {showGreeting && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-lg font-bold rounded-lg animate-pulse">
                            привет, Оля
                        </div>
                    )}

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Слоги по строкам</h3>
                        <ul className="list-disc list-inside">
                            {syllableCounts.map((count, idx) => (
                                <li key={idx}>Строка {idx + 1}: {count} слог{count === 1 ? '' : 'ов'}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4">
                        {rhymes.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Рифмы для слова</h3>
                                <ul className="list-disc list-inside">
                                    {rhymes.map((rhyme, idx) => (
                                        <li key={idx}>{rhyme}</li>
                                    ))}
                                </ul>
                                <p className="text-sm mt-2 text-green-400">
                                    Рифмы предоставлены <a href="https://rhymebrain.com" target="_blank" rel="noopener noreferrer" className="underline">RhymeBrain.com</a>
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

/* Зависимости:
```bash
npm install react syllables-ru tailwindcss postcss autoprefixer vite serve
```

* Структура проекта:
```
src/
  components/ui/card.jsx
  components/ui/button.jsx
  index.jsx
  TextEditor.jsx
index.html
package.json
tailwind.config.js
```

* Скрипты в `package.json`:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "serve": "serve -s dist -l 3000"
}
```

* После сборки (папка `dist` по умолчанию):
```bash
npm run build
npm run serve
```
*/
