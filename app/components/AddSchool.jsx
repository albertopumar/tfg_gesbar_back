var React = require("react");
var actions = require("../actions/SchoolActions");

module.exports = React.createClass({
    getInitialState:function(){
      return {
          name:"",
          tagline:""
      }  
    },
    addSchool:function(e){
        e.preventDefault();
        actions.addSchool(this.state);
    },
    render:function(){
        return(
            <form className="form" onSubmit={this.addSchool}>
                <div className="form-group">
                    <label className="control-label" htmlFor="name">School Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} placeholder="School Name" />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="tagline">Tagline:</label>
                    <input type="text" className="form-control" id="tagline" name="tagline" value={this.state.tagline} placeholder="Tagline" />
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Add School</button>
                </div>
            </form>
        )
    }
});