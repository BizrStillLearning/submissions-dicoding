const BASE_URL = 'https://notes-api.dicoding.dev/v2';

export class NotesApi {
  static async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    return responseJson.data;
  }

  static async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    return responseJson.data;
  }

  static async createNote(note) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    return responseJson.data;
  }

  static async deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    return responseJson;
  }

  static async archiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    return responseJson;
  }

  static async unarchiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    return responseJson;
  }
}
