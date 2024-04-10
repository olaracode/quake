class Api::V1::SismosController < ApplicationController
    # GET /api/v1/sismos
    def index
        page = params.fetch(:page, 1)
        per_page = params.fetch(:limit, 10)

        # Soft limit
        if per_page.to_i > 1000
            per_page = 1000
        end
        @sismos = Sismo.all.paginate(page: page, per_page: per_page)
        render json: {
            data: @sismos,
            pagination: {
                current_page: @sismos.current_page,
                total: @sismos.total_entries,
                per_page: @sismos.per_page
            }
        }
    end
end
