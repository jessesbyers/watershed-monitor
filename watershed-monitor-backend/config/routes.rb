Rails.application.routes.draw do

  get '/categories', to: 'categories#index'
  get '/categories/:id', to: 'categories#show'


  get '/observations', to: 'observations#index'
  get '/observations/:id', to: 'observations#show'
  

end
