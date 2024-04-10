Rails.application.routes.draw do
  namespace :api do
    resources :features do
      get 'comments', on: :member
      get 'all_comments', on: :collection, to: 'features#all_comments'
      post 'comments', on: :member, to: 'features#create_comments'
    end
  end
end
