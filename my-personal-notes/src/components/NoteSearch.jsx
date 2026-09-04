import React from 'react';

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);

    // TODO [Skilled] menyimpan searchKeyword di state lokal komponen NoteSearch
    this.state = {
      searchKeyword: '',
    };

    this.onSearchChangeEventHandler = this.onSearchChangeEventHandler.bind(this);
  }

  onSearchChangeEventHandler(event) {
    const keyword = event.target.value;

    // Perbarui state lokal
    this.setState({ searchKeyword: keyword });

    // Teruskan keyword ke App.jsx melalui props
    this.props.onSearch(keyword);
  }

  render() {
    return (
      <div className="note-search" data-testid="note-search">
        <input
          type="text"
          placeholder="Cari catatan ..."
          value={this.state.searchKeyword}
          onChange={this.onSearchChangeEventHandler}
          data-testid="note-search-input"
        />
      </div>
    );
  }
}

export default NoteSearch;