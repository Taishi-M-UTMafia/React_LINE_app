module Api
  class MessagesController < ApplicationController
    before_action :open_chat_id_present?

    def open_chat_id_present?
      if params[:open_chat_id] == nil
        render json: []
      else
        @chat_room = Friendship.find_by(chat_room_id: chat_room_id(params[:open_chat_id]))
      end
    end

    def index
      render json: @chat_room.all_messages
    end

    def post_message
      new_message = Message.new(content: params[:value],
                                from_user_id: current_user.id,
                                chat_room_id: chat_room_id(params[:open_chat_id]),
                                message_type: "text")
      render json: @chat_room.all_messages if new_message.save
    end

    def post_image
      posted_image = params[:image]
      path         = Time.now.to_i.to_s + posted_image.original_filename
      output_path  = Rails.root.join('public/message_images', path)
      new_image    = Message.new(content: path,
                                 from_user_id: current_user.id,
                                 chat_room_id: chat_room_id(params[:open_chat_id]),
                                 message_type: "image")

      File.open(output_path, 'w+b') do |fp|
        fp.write  posted_image.tempfile.read
      end

      render json: @chat_room.all_messages if new_image.save
    end
  end
end
