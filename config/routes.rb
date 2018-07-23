Rails.application.routes.draw do

  get 'pages/show'

  root 'messages#index'
end
