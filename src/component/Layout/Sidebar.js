import React, {Component} from 'react'
import ReactDOM from 'react-dom';

class Sidebar extends Component {
  render() {
    return (
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Category Primary</h2>
          <div className="panel-group category-products" id="accordian">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title">
										<a data-toggle="collapse" data-parent="#accordian" href="#mens">
											<span className="badge pull-right"><i className="fa fa-plus"></i></span>
											Mens
										</a>
									</h4>
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h4 className="panel-title">
										<a data-toggle="collapse" data-parent="#accordian" href="#womens">
											<span className="badge pull-right"><i className="fa fa-plus"></i></span>
											Womens
										</a>
									</h4>
								</div>
							</div>
						</div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
