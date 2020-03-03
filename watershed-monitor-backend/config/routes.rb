# Rails.application.routes.draw do
#   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
# end


# TEST _________________________________________
Rails.application.routes.draw do
  get '/test', to: 'application#test'
end
