import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'

class Update extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title : "", 
            content : "",
            alert : null, 
            message : "", 
            erros : []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleUpdateArticle = this.handleUpdateArticle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    componentDidMount(){
        const articleId = this.props.match.params.id

        axios.get('http://localhost:8000/api/article/' + articleId).then(response => {
            this.setState({
                title : response.data.title,
                content : response.data.content
            })
        })
    }

    goToHome() {
        const getAlert = () => (
            <SweetAlert
                success
                title="success"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={4000}
                confirmBtnText={this.state.message}
                >
            </SweetAlert>
        );
        this.setState({
            alert : getAlert()
        });
    }

    onSuccess() {
        this.props.history.push('/')
    }

    hideAlert() {
        this.setState({
            alert : null
        });
    }

    handleUpdateArticle(event) {
        event.preventDefault()

        const article = {
            title : this.state.title,
            content : this.state.content
        }
        const articleId = this.props.match.params.id

        axios.put("http://localhost:8000/api/article/" + articleId, article).then(response => {
            console.log(response)
            var data = response.data
            var status = response.status
            if(status == 200) {
                this.setState({
                    message : response.statusText
                })
                this.goToHome();
            }
        });
    }

    hasErrorFor(field) {
        return !!this.state.erros[field]
    }

    renderErrorFor(field) {
        if(this.hasErrorFor(field)) {
            return(
                <span className="invalid-feedback">
                    <strong>{ this.state.erros[field][0] } </strong>
                </span>
            )
        }
    }

    render() {
        const { article } = this.state
        return (
            <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Edit Data</div>
                  <div className='card-body'>
                    <form onSubmit={ this.handleUpdateArticle }>
                      <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input
                          id='title'
                          type='text'
                          className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                          name='title'
                          value={this.state.title}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('title')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content'>Content</label>
                        <textarea
                          id='content'
                          className={`form-control ${this.hasErrorFor('content') ? 'is-invalid' : ''}`}
                          name='content'
                          rows='10'
                          value={this.state.content}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('content')}
                      </div>
                      <Link
                        className='btn btn-secondary'
                        to={`/`}
                        >Back
                      </Link>
                      
                      <button className='btn btn-primary'>Update</button>
                      {this.state.alert}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default Update