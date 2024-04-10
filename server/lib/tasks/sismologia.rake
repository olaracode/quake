# lib/tasks/sismologia.rake
require 'net/http'
require 'json'

namespace :sismologia do
    desc "Obtener y almacenar datos sismológicos"
    task obtener_datos: :environment do
        url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
        uri = URI(url)
        response = Net::HTTP.get(uri)
        data = JSON.parse(response)

        data['features'].each do |feature|
            id = feature['id']
            properties = feature['properties']
            geometry = feature['geometry']

            # Validar que los campos requeridos no sean nulos
            next if properties['title'].nil? || properties['url'].nil? || properties['place'].nil? || properties['magType'].nil? || geometry['coordinates'].nil?

            # Validar rangos
            next if properties['mag'] < -1.0 || properties['mag'] > 10.0
            next if geometry['coordinates'][0] < -180.0 || geometry['coordinates'][0] > 180.0
            next if geometry['coordinates'][1] < -90.0 || geometry['coordinates'][1] > 90.0

            # Crear o actualizar el registro
            Sismo.find_or_create_by(id: id) do |sismo|
                sismo.mag = properties['mag']
                sismo.place = properties['place']
                sismo.time = Time.at(properties['time'] / 1000)
                sismo.url = properties['url']
                sismo.tsunami = properties['tsunami']
                sismo.magType = properties['magType']
                sismo.title = properties['title']
                sismo.longitude = geometry['coordinates'][0]
                sismo.latitude = geometry['coordinates'][1]
            end
        end
    end
end