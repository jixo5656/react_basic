import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import ReadContents from "./components/ReadContents";
import CreateContents from "./components/CreateContents";
import UpdateContents from "./components/UpdateContents";
import Subject from "./components/Subject";
import Control from "./components/Control";




class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id=3;
    this.state={
      mode:'welcome',
      selected_content_id:2,
      welcome:{title:'welcome', sub:'hello react'},
      subject:{title:'WEB', sub:'World Wide Web'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is'},
        {id:2, title:'CSS', desc:'CSS is'},
        {id:3, title:'JavaScript', desc:'JavaScript is'},
      ]
    }
  }
  getReadContent(){
    var i=0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i=i+1;
    }  
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContents title={_title} desc={_desc}></ReadContents>;
    }
    else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContents title={_content.title} desc={_content.desc}></ReadContents>;
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContents onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;

        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        //var _contents = Array.from(this.state.contents);
        //_contents.push({id:this.max_content_id, title:_title, desc:_desc}); 
        // ↑배열내용복사 Array.from(content);
        //  객체내용복사 Object.assign({},content);
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        })
      }.bind(this)}></CreateContents>;

    }
    else if(this.state.mode === 'update'){
      var _content = this.getReadContent();
      _article = <UpdateContents data={_content} onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i=0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};            
            break;
          }
          i = i+1;
        }
        this.setState({
            contents:_contents,
            mode:'read'
          })
      }.bind(this)}></UpdateContents>;
    }
    else if(this.state.mode === 'delete'){
      
    }
    return _article;
  }

  render(){
    
    return(
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        
        
        <TOC 
          onChangePage={function(id){
              this.setState({
                mode:'read',
                selected_content_id:Number(id)
              });              
          }.bind(this)} 
          data={this.state.contents}
        >
        </TOC>
        
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i<_contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                  break;
                }
                i=i+1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              })
            }
            alert('deleted');
          }
          else{
            this.setState({
              mode:_mode
            });
          }          
        }.bind(this)}
        >          
        </Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
