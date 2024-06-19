import React from 'react';
import '../../src/css/style.css';
import { Link } from 'react-router-dom';
interface Props {
}

interface State {
}

class MainPage extends React.Component<State> {
    componentDidMount(): void {
    }
    render() {


        return (
            <>
                <div className="container">
                    <div className="mainContainer">
                        <Link to="/portfolio">
                            <button className='mainBtn'>welcome </button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

export default MainPage;
