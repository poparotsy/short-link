import React from 'react';
import LinksList from '../ui/LinksList';
import PrivateHeader from '../ui/PrivateHeader';
import AddLink from '../ui/AddLink';
import LinksListFilters from '../ui/LinksListFilters';

// Stateless functional components example

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
        <div className="page-content">
          <LinksListFilters/>
          <AddLink/>
          <LinksList/>
        </div>
    </div>
  );
}




// export default class Link extends React.Component {
//
//   render() {
//     return (
//       <div>
//         <PrivateHeader title="Your Links"/>
//         <LinksList/>
//         <AddLink/>
//       </div>
//     );
//   }
// }
