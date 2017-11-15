Rails.application.routes.draw do
  resources :algorithms
    devise_for :users, controllers: { registrations: "registrations",:omniauth_callbacks=>"callbacks"}

      root 'home#index'

    get 'home/profile'
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
