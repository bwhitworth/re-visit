import React from 'react';
import { Link } from 'react-router-dom';

import memoryShape from '../../../helpers/propz/memoryShape';
import './MemoryCard.scss';

class MemoryCard extends React.Component {
  static propTypes = {
    memory: memoryShape.memoryShape,
  }

  render() {
    const { memory } = this.props;
    const singleMemLink = `/memories/${memory.id}`;
    return (
      <div className="row">
        <Link to={singleMemLink}>{memory.name}</Link>
      </div>
    );
  }
}

export default MemoryCard;
