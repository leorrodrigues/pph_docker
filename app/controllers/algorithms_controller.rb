class AlgorithmsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_algorithm, only: [:show, :edit, :update, :destroy]

    helper_method :get_terrain,:prepare_map,:change_map
    # GET /algorithms
    # GET /algorithms.json
    def index
        puts "OI"
        @algorithms = Algorithm.all
    end

    # GET /algorithms/1
    # GET /algorithms/1.json
    def show
        puts "OI"
    end

    # GET /algorithms/new
    def new
        puts "OI"
        @algorithm = Algorithm.new
    end

    # GET /algorithms/1/edit
    def edit
        puts "OI"
    end

    # POST /algorithms
    # POST /algorithms.json
    def create
        puts "OI"
        @algorithm = Algorithm.new(algorithm_params)

        respond_to do |format|
            if @algorithm.save
                format.html { redirect_to @algorithm, notice: 'Algorithm was successfully created.' }
                format.json { render :show, status: :created, location: @algorithm }
            else
                format.html { render :new }
                format.json { render json: @algorithm.errors, status: :unprocessable_entity }
            end
        end
    end

    # PATCH/PUT /algorithms/1
    # PATCH/PUT /algorithms/1.json
    def update

            puts "OI"
        respond_to do |format|
            if @algorithm.update(algorithm_params)
                format.html { redirect_to @algorithm, notice: 'Algorithm was successfully updated.' }
                format.json { render :show, status: :ok, location: @algorithm }
            else
                format.html { render :edit }
                format.json { render json: @algorithm.errors, status: :unprocessable_entity }
            end
        end
    end

    # DELETE /algorithms/1
    # DELETE /algorithms/1.json
    def destroy
        @algorithm.destroy
        respond_to do |format|
            format.html { redirect_to algorithms_url, notice: 'Algorithm was successfully destroyed.' }
            format.json { head :no_content }
        end
    end

    def change_map
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_algorithm
            @algorithm = Algorithm.find(params[:id])
        end

        # Never trust parameters from the scary internet, only allow the white list through.
        def algorithm_params
            params.fetch(:algorithm, {})
        end

        def get_terrain(path)
            file = File.open(path, "r")
            data = file.read
            file.close
            data.delete!(' ')
            data.delete!("\n")
        end

        def prepare_map(rows,lines,terrain_weights,init,final)
            index=0
            str='<table>'
            (0...lines).each do
                str+="<tr>"
                (0...rows).each do
                    if index+1==init[0]*init[1]
                        str+='<td bgcolor="#cc00cc"> &nbsp;</td>'
                    elsif index+1==final[0]*final[1]
                        str+='<td bgcolor="#669999"> &nbsp;</td>'
                    else
                        case terrain_weights[index]
                        when '0'
                            str+='<td bgcolor="#00D600"> &nbsp;</td>'
                        when '1'
                            str+='<td bgcolor="#996000"> &nbsp;</td>'
                        when '2'
                            str+='<td bgcolor="#0000CC"> &nbsp;</td>'
                        when '3'
                            str+='<td bgcolor="#CC0000"> &nbsp;</td>'
                        else
                            std+="<td>?</td>"
                        end
                    end
                    index+=1
                end
                str+="</tr>"
            end
            str+="</table>"
        end
end
