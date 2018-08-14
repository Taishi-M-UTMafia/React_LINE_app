module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.where()
      render json: @messages
    end

    def create
      @friendship_id=set_friendship_id(params[:open_chat_id])
      Message.create(content: params[:value], friendship_id: @friendship_id)
      render json: @friendship_id
    end

    def set_friendship_id(to_user_id)
      @to_user_id=to_user_id
      @to_user_id_to_i=@to_user_id.to_i
      @current_user_id=current_user.id.to_i
      if current_user.id > @to_user_id
        "#{@to_user_id_to_i}-#{@current_user_id}"
      else
        "#{@current_user_id}-#{@to_user_id_to_i}"
      end
    end
  end

end
