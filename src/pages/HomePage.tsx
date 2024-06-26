import React, { ChangeEvent } from 'react';
import axios from 'axios';

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
            newGuestName: '',
            newReplyText: '',
            responseMessage: '',
            guests: []
        };
    }

    componentDidMount(): void {
        this.fetchData();
        this.fetchGuests();
    }

    fetchGuests = () => {
        axios.get<Guest[]>('http://34.16.172.154:8080/guest-replies')
        // axios.get<Guest[]>('http://localhost:8080/guest-replies')
            .then(response => {
                this.setState({ guests: response.data });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    fetchData = () => {
        // axios.get<string>('http://localhost:8080/checkConnection')
        axios.get<string>('http://34.16.172.154:8080/checkConnection')
            .then(response => {
                this.setState({ responseMessage: response.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ responseMessage: '데이터 가져오기 오류 발생' });
            });
    };

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
                id: Date.now(), // 임시로 생성
                guestName: newGuestName,
                replyText: newReplyText,
                isActive: true // Initially active
            };
            // axios.post('http://localhost:8080/guest-replies', newGuest)
            axios.post('http://34.16.172.154:8080/guest-replies', newGuest)
                .then(response => {
                    console.log('Guest added:', response.data);
                    this.fetchGuests(); // 데이터 다시 불러오기
                    this.setState({ newGuestName: '', newReplyText: '' }); // 입력 필드 초기화
                })
                .catch(error => console.error('Error adding guest:', error));
        }
    };

    handleDelete = (id: number) => {
        // axios.delete(`http://localhost:8080/guest-replies/${id}`)
        axios.delete(`http://34.16.172.154:8080/guest-replies/${id}`)
            .then(response => {
                console.log('Guest deleted:', response.data);
                this.fetchGuests(); // 데이터 다시 불러오기
            })
            .catch(error => console.error('Error deleting guest:', error));
    };
    
    

    render() {
        const { newGuestName, newReplyText, responseMessage, guests } = this.state;

        return (
            <div className="container">
                <div className="homeContainer">
                    <div className="homeContents">
                        <div className="inHomeContent">
                            <div className="inContent1">

                            </div>
                            <div className="inContent2">
                                <p>연결 확인 : {responseMessage}</p>
                                <button className="inContentBtn">HOME</button>
                                <div className="reply">
                                    <h2>Guest List</h2>
                                    <form onSubmit={this.handleSubmit}>
                                        <input
                                            type="text"
                                            name="newGuestName"
                                            value={newGuestName}
                                            onChange={this.handleInputChange}
                                            placeholder="게스트 이름"
                                        />
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
                                                    <button onClick={() => this.handleDelete(guest.id)}>삭제</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="musicContents">
                        <div className="inMusicContent"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
