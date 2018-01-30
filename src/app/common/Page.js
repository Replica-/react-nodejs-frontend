import React from 'react'


// This component serves to be a higher order component that react can work with. Straight class inheritance doesn't work quite well so this method must be used.
export function PageComponent(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidMount() {

        }

        componentWillUnmount() {

        }

        handleChange() {

        }

        // Basically render title if it exists
        render() {

            let header = (this.props.title?<h1 className="page-header">{this.props.title}</h1>:null);

            let html =
                    (<div className={'Page Page-' + WrappedComponent.name}>
                        {header}
                        <WrappedComponent{...this.props} />
                    </div>);

            return html;
        }
    };
}