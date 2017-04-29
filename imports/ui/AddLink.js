import React from 'react';
import Modal from 'react-modal';

export default class AddLink extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    url: '',
    isOpen: false,
    error: ''
  }
}

  onSubmit(e) {
    // const url = this.refs.url.value.trim();
    // const url = this.state.url;
    const {url} = this.state;
    e.preventDefault();


      Meteor.call('links.insert', url, (err, res) => {
        if(!err) {
          this.handleModalClose();
        } else {
          this.setState({error: err.reason})
        }
      });
    }

  onChange(e){
    this.setState({
      url: e.target.value
    });
  }

  handleModalClose() {
    this.setState({isOpen: false, url: '', error: ''});
  }

  render () {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ add link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view--box"
          overlayClassName="boxed-view boxed-view--modal">
          <h3>Add Link</h3>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view--form">
              <input
                type="text"
                ref="url"
                placeholder="URL"
                value={this.state.url}
                onChange={this.onChange.bind(this)}
              />
            <button className="button">add link</button>
          <button type="button" className="button button--secondary"
            onClick={this.handleModalClose.bind(this)}>cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
