import React, { ChangeEvent } from 'react';
import axios from 'axios';
import MusicComponent from '../component/MusicComponent';
import Career from './homepage/Career';
import SideHomeComponent from '../component/SideHomeComponent';
import Skill from './homepage/Skill';
import Project from './homepage/Project';
import Project2 from './homepage/Project2';
import Experience from './homepage/Experience';
import Wish from './homepage/Wish';

interface Guest {
    id: number;
    guestName: string;
    replyText: string;
    isActive: boolean; // New field for delete flag
}

interface State {
    newGuestName: string;
    newReplyText: string;
    responseMessage: string;
    guests: Guest[]; // Assuming Guest interface is defined elsewhere
}

class HomePage extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            newGuestName: '', // Initialize with empty string
            newReplyText: '',
            responseMessage: '',
            guests: []
        };
    }

    componentDidMount(): void {
        ;
        this.fetchGuests();

        // Retrieve 'nickname' from local storage
        const storedNickname = localStorage.getItem('nickname');
        if (storedNickname) {
            this.setState({ newGuestName: storedNickname });
        }
    }

    fetchGuests = () => {
        axios.get<Guest[]>('http://localhost:22/guest-replies')
            // axios.get<Guest[]>('http://3.24.123.44:22/guest-replies')
            .then(response => {
                this.setState({ guests: response.data });
            })
            .catch(error => console.error('Error fetching data:', error));
    }


    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { newGuestName, newReplyText } = this.state;
        if (newGuestName.trim() !== '' && newReplyText.trim() !== '') {
            const newGuest: Guest = {
                id: Date.now(),
                guestName: newGuestName,
                replyText: newReplyText,
                isActive: true
            };
            axios.post('http://localhost:22/guest-replies', newGuest)
                // axios.post('http://3.24.123.44/guest-replies', newGuest)
                .then(response => {
                    console.log('Guest added:', response.data);
                    this.fetchGuests();
                    this.setState({ newGuestName: '', newReplyText: '' });
                })
                .catch(error => console.error('Error adding guest:', error));
        }
    };

    handleDelete = (id: number) => {
        axios.delete(`http://localhost:22/guest-replies/${id}`)
            // axios.delete(`http://3.24.123.44:22/guest-replies/${id}`)
            .then(response => {
                console.log('Guest deleted:', response.data);
                this.fetchGuests();
            })
            .catch(error => console.error('Error deleting guest:', error));
    };

    render() {
        const { newReplyText, responseMessage, guests } = this.state;
        const storedNickname = localStorage.getItem('nickname');

        return (
            <div className="container">
                <div className="homeContainer">
                    <div className="homeContents">
                        <div className="inHomeContent">
                            <SideHomeComponent></SideHomeComponent>
                            <div className="inContent2">
                                <div >
                                    <button className="inContentBtn1">HOME</button>

                                    <div className="reply">
                                        <h2>Guest List</h2>
                                        <form onSubmit={this.handleSubmit}>
                                            <input
                                                type="text"
                                                name="newReplyText"
                                                value={newReplyText}
                                                onChange={this.handleInputChange}
                                                placeholder="댓글을 입력하세요"
                                            />
                                            <button type="submit">댓글 추가</button>
                                        </form>
                                        <div className="reply">
                                            <ul>
                                                {guests.map(guest => (
                                                    <li key={guest.id}>
                                                        {guest.guestName}: {guest.replyText}
                                                        {storedNickname === guest.guestName && (
                                                            <button onClick={() => this.handleDelete(guest.id)}>삭제</button>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <Career/>
                            <Skill/>
                            <Project />
                            <Project2 />
                            <Experience />
                            <Wish /> */}
                            </div>
                        </div>
                    </div>
                    <MusicComponent />
                </div>
            </div>
        );
    }

}

export default HomePage;
