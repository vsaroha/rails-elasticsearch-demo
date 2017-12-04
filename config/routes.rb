Rails.application.routes.draw do
  get 'page_views' => 'pages#page_views'
  root to: 'pages#index'
end
