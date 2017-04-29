import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
       copied : false,
    };
  }

  componentDidMount(){
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => {
      this.setState({copied: true});
      setTimeout(() => this.setState({ copied: false }), 1000);
      }).on('error', () =>{
      alert('did NOT work!');
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = 'no visits yet';
    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
    }
    return (
      <div>
      <p className="item--message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
      </div>
    );
  }

  render () {
    return (
      <div className="item">

          <h2>{this.props.url}</h2>
          <p className="item--message">{this.props.shortUrl}</p>
          {this.renderStats()}
          <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
            visit
          </a>

          <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
            {this.state.copied ? 'copied' : 'copy'}
          </button>
          <button className="button button--pill" onClick={() => {
            Meteor.call('link.setVisability', this.props._id, !this.props.visable);
          }}>
            {this.props.visable ? 'hide' : 'unhide'}
          </button>
      </div>
    );
  }

}



// export default (props) => {
//   return (
//     <div>
//       <ul>
//         <li>{props.url}</li>
//         <li>{props.shortUrl}</li>
//       </ul>
//
//     </div>
//   );
// }
