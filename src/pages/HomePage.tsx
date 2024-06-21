import React from 'react';
import axios from 'axios';



class HomePage extends React.Component<{}> {
    componentDidMount(): void {
        this.fetchData();
    }

    state = {
        comments: [], // 댓글 목록을 저장할 배열
        newComment: '', // 입력된 새 댓글을 저장할 상태
        responseMessage: ''
    };


    fetchData = () => {
        // axios.get('http://localhost:8081/checkConnection')
        axios.get('http://34.16.172.154/checkConnection')
            .then(response => {
                this.setState({ responseMessage: response.data });
            })
            .catch(error => {
                console.error('데이터 가져오기 오류:', error);
                this.setState({ responseMessage: '데이터 가져오기 오류 발생' });
            });
    };

    handleInputChange = (e: { target: { value: any; }; }) => {
        this.setState({ newComment: e.target.value });
    };

    // 댓글 추가 버튼 클릭 시 호출되는 함수
    addComment = () => {
        const { newComment } = this.state;
        if (newComment.trim() !== '') {
            this.setState({
                comments: [...this.state.comments, newComment],
                newComment: '', // 입력 필드 초기화
            });
        }
    };

    deleteComment = (index: number) => {
        const updatedComments = [...this.state.comments];
        updatedComments.splice(index, 1); // 해당 인덱스의 댓글 제거
        this.setState({ comments: updatedComments });
    };



    render() {

        const { comments, newComment,responseMessage  } = this.state;


        return (
            <>
                <div className="container">
                    <div className="homeContainer">
                        <div className="homeContents">
                            <div className="inHomeContent">
                                <div className="inContent1">

                                </div>
                                <div className="inContent2">
                                <p>{responseMessage}</p>
                                    <button className="inContentBtn">HOME</button>
                                    <div className="reply">
                                        {/* 댓글 입력 폼 */}
                                        <input
                                            type="text"
                                            value={newComment}
                                            onChange={this.handleInputChange}
                                            placeholder="댓글을 입력하세요"
                                        />
                                        <button onClick={this.addComment}>댓글 추가</button>
                                        <div className="reply">
                                            {comments.map((comment, index) => (
                                                <div key={index} className="comment">
                                                    {comment}
                                                    <button onClick={() => this.deleteComment(index)}>삭제</button>
                                                </div>
                                            ))}
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
            </>
        )
    }
}

export default HomePage;
