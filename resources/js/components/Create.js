import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'

class Create extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            title : "",
            content : "",
            alert : null, 
            errors : []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)

    }

    handleFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    goToHome() {
        const getAlert = () => (
            <SweetAlert
                success
                title ="success!"
                onConfirm ={() => this.onSuccess() }
                onCancel ={() => this.hideAlert() }
                timeout ={4000}
                confirmBtnText= "Ashiaap"
                >
                Created article successfully
            </SweetAlert>
        )
        this.setState({
            alert : getAlert()
        })
    }

    onSuccess() {
        this.props.history.push("/")
    }

    hideAlert() {
        this.setState({
            alert : null
        })
    }

    handleCreateNewArticle(event) {
        event.preventDefault()

        if(this.state.title != "" && this.state.content != "") {
            const article = {
                title : this.state.title, 
                content : this.state.content
            }
            axios.post('/api/article', article).then(response => {
                var data = response.data
                var status = response.status
                if(status == 201) {
                    this.goToHome()
                }
            })
        }
        else {
            console.log("empty")
            this.hasErrorFor("title")
        }
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if(this.hasErrorFor(field)) {
            return(
                <span className='invalid-feedback'>
                    <strong>{ this.state.errors[field][0] }</strong>
                </span>
            )
        }
    }



    render() {
        return (
            <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Create new Article</div>
                  <div className='card-body'>
                    <form onSubmit={this.handleCreateNewArticle}>
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
                        <label htmlFor='content'>Article content</label>
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

                      <button className='btn btn-primary'>Create</button>
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

export default Create