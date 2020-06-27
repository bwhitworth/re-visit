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
      <div className="MemoryCard col-6">
        <Link className="card custom-card" to={singleMemLink}>
          <div className="card-body custom-card">
            <h3 className="card-title">{memory.name}</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default MemoryCard;
