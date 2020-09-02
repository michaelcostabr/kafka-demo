import React from 'react';
export class Nome extends React.Component {

    getValue() {
        return this.state.playerName;
    }

    constructor(props) {
        super(props);

        this.state = {
            playerName: this.props.playerName
        }
    }

    handleChange(event) {
        this.setState({ playerName: event.target.value });
    }

    render() {
        var nomeChanched = this.props.nomeChanched;
        return <div>
            <label>Informe seu nome:&nbsp;<input type="text" value={this.state.playerName} onChange={e => { this.setState({ playerName: e.target.value }) }} />
            </label><button onClick={() => nomeChanched(this.state.playerName)}>Jogar</button></div>
    }
}
export default Nome