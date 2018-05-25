new Vue({
    el: '#app',
    data: function() {
      return { visible: false ,input:'' }
    },
    methods:{
      setUser(){
        // console.log('123')
          window.location = '/users/signup'
      },
      postLogin(){
        axios.post('/users/login/',{
          name:'',
        }).then((res)=>{
          console.log(res)
        })
      }
    }
  })