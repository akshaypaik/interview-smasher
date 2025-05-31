import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box } from '@mui/material';
import { MdHorizontalRule } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import Underline from '@tiptap/extension-underline';
import { useEffect, useState } from 'react';

// define your extension array
const extensions = [StarterKit, Underline];

const Tiptap = ({ onContentChange, isReset, patchContent }) => {

    const [content, setContent] = useState("");

    const editor = useEditor({
        extensions,
        content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);
            onContentChange?.(html);
        },
    });

    const onReset = () => {
        setContent("");
        editor?.commands.clearContent();
    }

    useEffect(() => {
        if (isReset) {
            onReset();
        }
    }, [isReset]);

    useEffect(() => {
        if (patchContent && patchContent != "") {
            editor?.commands.setContent(patchContent);
            setContent(patchContent);
        }
    }, [patchContent]);

    if (!editor) {
        return null;
    }

    return (
        <div>
            <div className="control-group">
                <div className="button-group flex flex-wrap gap-2 bg-gray-100 p-2 rounded-xl shadow border border-gray-100
                transition-all duration-300 hover:shadow-lg">
                    <button
                        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
                        className={`${editor.isActive('bold') ? 'is-active' : ''} font-bold bg-gray-200 p-2 rounded-xl
                        cursor-pointer`}
                    >
                        B
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
                        className={`${editor.isActive('italic') ? 'is-active' : ''} italic bg-gray-200 p-2 rounded-xl
                        cursor-pointer`}
                    >
                        I
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run() }}
                        className={`${editor.isActive('underline') ? 'is-active' : ''} underline bg-gray-200 p-2 
                        rounded-xl cursor-pointer`}
                    >
                        U
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run() }}
                        className={`${editor.isActive('strike') ? 'is-active' : ''} bg-gray-200 p-2 rounded-xl
                        cursor-pointer line-through`}
                    >
                        Strike
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); editor.chain().focus().setParagraph().run() }}
                        className={`${editor.isActive('paragraph') ? 'is-active' : ''} bg-gray-200 p-2 rounded-xl cursor-pointer`}
                    >
                        P
                    </button>
                    <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setHorizontalRule().run() }}
                        className={`bg-gray-200 p-2 rounded-xl cursor-pointer`}>
                        {/* Horizontal rule */}
                        <MdHorizontalRule title='Horizontal Rule' />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run() }}
                        className={`bg-gray-200 p-2 rounded-xl cursor-pointer`}>
                        {/* Undo */}
                        <FaUndo title='Undo' />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run() }}
                        className={`bg-gray-200 p-2 rounded-xl cursor-pointer`}>
                        {/* Redo */}
                        <FaRedo title='Redo' />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); editor.chain().focus().unsetAllMarks().run() }}
                        className={`bg-gray-200 p-2 rounded-xl cursor-pointer`}>
                        Clear
                    </button>
                </div>
            </div>

            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    p: 2,
                    mt: 2,
                    backgroundColor: '#fafafa',
                    '& .ProseMirror': {
                        minHeight: 320,
                        outline: 'none',
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                    },
                }}
            >
                <EditorContent editor={editor} />
            </Box>
        </div>
    )
}

export default Tiptap
