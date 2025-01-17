import { useState } from "react";

function EditForm({ post, onEdit }) {
  const { id, title, body } = post;

  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

  function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      ...post,
      title: editTitle,
      body: editBody,
    };

    onEdit(id, newPost);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={editBody}
        onChange={(e) => setEditBody(e.target.value)}
      />
      <button type="submit">Edit</button>
      {/* <button type="reset">Clear</button> */}
    </form>
  );
}

export default EditForm;
