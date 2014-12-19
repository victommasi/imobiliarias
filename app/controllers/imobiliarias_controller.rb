  class ImobiliariasController < ApplicationController

  skip_before_action :verify_authenticity_token
  
  # GET /imobiliarias
  # GET /imobiliarias.json
  def index
    @imobiliarias = Imobiliaria.all

    respond_to do |format|
    #  format.html # index.html.erb
      format.json { render json: @imobiliarias }
    end
  end

  def imobiliaria_params
    params.require(:imobiliaria).permit(:nome, :cnpj)
  end

  # POST /imobiliarias
  # POST /imobiliarias.json
  def create
    @imobiliaria = Imobiliaria.new(imobiliaria_params)

    respond_to do |format|
      if @imobiliaria.save
        format.json { render json: @imobiliaria, status: :created }
      else 
        format.json { render json: @imobiliaria.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /imobiliarias/1
  # DELETE /imobiliarias/1.json
  def destroy
    @imobiliaria = Imobiliaria.find(params[:id])
    @imobiliaria.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  # GET /imobiliarias/1
  # GET /imobiliarias/1.json
  def show
    @imobiliaria = Imobiliaria.find(params[:id])

    respond_to do |format|
      format.json { render json: @imobiliaria }
    end
  end

  def update
    @imobiliaria = Imobiliaria.find(params[:id])

    respond_to do |format|
      if @imobiliaria.update_attributes(imobiliaria_params)
        format.html { redirect_to @room, notice: 'Room was successfully updated.' }
        format.json {head :no_content}
      else
        format.json { render json: @imobiliaria.errors, status: :unprocessable_entity } 
      end
    end
  end

end