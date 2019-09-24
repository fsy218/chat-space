class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    respond_to do |format|
      format.html
      format.json { @messages = group.messages.includes(:user).where("id > #{last_message_id}") }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました。'}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end