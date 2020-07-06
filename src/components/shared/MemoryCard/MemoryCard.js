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
      <div className="MemoryCard col-sm-6">
        <Link className="card custom-card" to={singleMemLink}>
          <div className="card-body row pad-zero">
            <div className="col-2 pad-zero">
              <h3>
              {(() => {
                switch (this.props.memory.categoryId) {
                  case 'category1': return <i className="fas fa-utensils"></i>;
                  case 'category2': return <i className="fas fa-hiking"></i>;
                  case 'category3': return <i className="fas fa-camera"></i>;
                  default: return <i className="far fa-comment-dots"></i>;
                }
              })()}
              </h3>
            </div>
            <div className="col-10 pad-zero">
              <h3 className="card-title">{memory.name}</h3>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default MemoryCard;
