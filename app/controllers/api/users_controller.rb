module Api
  class UsersController < ApplicationController
    def find_search_user
      search_users = User.limit(5).where('name LIKE ?', "%#{params[:value]}%").where.not(id: current_user.id)
      render json: search_users
    end

    def find_current_user
      render json: current_user
    end

    def find_friends
      render json: current_user.friends
    end

    def find_to_user
      to_user = User.find_by(id: params[:open_chat_id])
      render json: to_user
    end
  end
end
