module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      render json: @users
    end

    def search
      @users=User.where('name LIKE ?', "%#{params[:value]}%")
      render json: @users
    end

    def find_current_user
      @user=User.find_by(id: current_user.id)
      render json: @user
    end

    def find_friends
      @user=User.find_by(id: current_user.id)
      @friends=@user.friends
      render json: @friends
    end
  end

end
