var React = require("react");

module.exports = React.createClass({
    getInitialState: function () {
        return {
            structure: {
                'name': 'oferta café + tostada',
                'properties': [
                    {
                        'name': 'café',
                        'properties': ['solo', 'con leche', 'colacao']
                    },
                    {
                        'name': 'tostada',
                        'properties': ['de la casa', 'alto calórica', 'mantequilla', 'york']
                    }
                ]
            }
        }
    },
    render: function () {
        return (
            <div>
                {this.structure.map(function(name, properties){
                    return <div><p>Nombre: {name}</p><p>Propiedades: {properties}</p></div>;
                })}
            </div>
        )
    }
});