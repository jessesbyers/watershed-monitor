


Rails.application.routes.draw do

  # TEST _________________________________________
  get '/test', to: 'application#test'

  get '/maps', to: 'maps#index'
  get '/maps/:id', to: 'maps#show'


  get '/observations', to: 'observations#index'
  get '/observations/:id', to: 'observations#show'

end
