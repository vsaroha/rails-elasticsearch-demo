class PagesController < ApplicationController
  def page_views
    query = ElasticStreemSearch.new(params[:urls], params[:after],
             params[:before], params[:interval])
    if params[:formatted].present?
      result = query.formatted_response
    else
      result = query.query_es
    end
    render json: result.to_json
  end

  def index
    
  end
end