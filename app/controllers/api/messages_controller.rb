module Api
  class MessagesController < ApplicationController

    def index
      # TODO: Messageモデルのfriendship_idはfriendshipのidを入れるようにする
      @friendship_id=set_friendship_id(params[:openChatID])
      @messages = Message.where(friendship_id: @friendship_id)
      render json: @messages
    end

    def create
      @friendship_id=set_friendship_id(params[:open_chat_id])
      @message=Message.new(content: params[:value], from_user_id: current_user.id,
                          friendship_id: @friendship_id, message_type: "text")
      if  @message.save
        @messages=Message.where(friendship_id: @friendship_id)
        render json: @messages
      end
    end

    def post_image
      image = params[:image]
      path= Time.now.to_i.to_s + image.original_filename
      output_path = Rails.root.join('public/message_images', path)
      @friendship_id=set_friendship_id(params[:openChatID])
      File.open(output_path, 'w+b') do |fp|
        fp.write  image.tempfile.read
      end
      @message=Message.new(content: path, from_user_id: current_user.id,
                          friendship_id: @friendship_id, message_type: "image")
      if @message.save
        @messages=Message.where(friendship_id: @friendship_id)
        render json: @messages
      end
    end
  end

end
