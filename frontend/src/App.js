import './App.css';
import React, { useState } from 'react';
import { uploadFiles, createFile, editFile, deleteFile } from './mcpClient';

const App = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filename, setFilename] = useState('');
    const [content, setContent] = useState('');

    const handleUpload = async () => {
        try {
            await uploadFiles(Array.from(selectedFiles));
            alert('✅ Folder uploaded successfully!');
        } catch (err) {
            alert('❌ Upload failed.');
        }
    };

    const handleCreate = async () => {
        try {
            await createFile(filename, content);
            alert('✅ File created successfully!');
        } catch (err) {
            alert('❌ Create failed.');
        }
    };

    const handleEdit = async () => {
        try {
            await editFile(filename, content);
            alert('✅ File edited successfully!');
        } catch (err) {
            alert('❌ Edit failed.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteFile(filename);
            alert('✅ File deleted successfully!');
        } catch (err) {
            alert('❌ Delete failed.');
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <h1 className="heading">MCP File Operations</h1>

                <div className="section">
                    <label className="label">Upload Folder:</label>
                    <input
                        type="file"
                        webkitdirectory="true"
                        multiple
                        onChange={(e) => setSelectedFiles(e.target.files)}
                        className="input"
                    />
                    <button onClick={handleUpload} className="button upload">Upload Folder</button>
                </div>

                <div className="section">
                    <label className="label">Filename:</label>
                    <input
                        type="text"
                        placeholder="Enter filename"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="input"
                    />

                    <label className="label">File Content:</label>
                    <textarea
                        placeholder="Enter file content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="5"
                        className="textarea"
                    ></textarea>

                    <div className="button-group">
                        <button onClick={handleCreate} className="button create">Create File</button>
                        <button onClick={handleEdit} className="button edit">Edit File</button>
                        <button onClick={handleDelete} className="button delete">Delete File</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
