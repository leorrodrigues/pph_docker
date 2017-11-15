Rails.application.routes.draw do
    devise_for :users, controllers: { registrations: "registrations",:omniauth_callbacks=>"callbacks"}
    resources :posts
    root 'home#index'

    get 'home/profile'
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
