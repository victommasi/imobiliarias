class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  # GET /imobiliarias
  # GET /imobiliarias.json
  def index
    @imobiliarias = Imobiliaria.all

    #respond_to do |format|
    #  format.html # index.html.erb
    #  format.json { render json: @imobiliarias }
    #end
  end
end
