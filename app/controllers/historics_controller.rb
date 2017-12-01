class HistoricsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_historic, only: [:show, :edit, :update, :destroy]

    def index
        @historics = Historic.all
        @maps = Map.all
    end


    private
        # Use callbacks to share common setup or constraints between actions.
        def set_historic
            @historic = historic.find(params[:id])
            @map= map.find(params[:id])
        end

        # Never trust parameters from the scary internet, only allow the white list through.
        def historic_params
            params.fetch(:historic, {})
        end

        def map_params
            params.fetch(:map,{})
        end
end
