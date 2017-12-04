require 'elasticsearch'

class ElasticStreemSearch

  COLOR_ARRAY = ["#2b6f53", "#d82d6e", "#25A1F3", "#94a2bd", "#000000"]

  def initialize(urls, after, before, interval)
    @client = Elasticsearch::Client.new url: 'http://elastic:streem@test.es.streem.com.au:8080', log: true
    @urls = urls || ["http://www.smh.com.au/nsw/premier-gladys-berejiklian-announces-housing-affordability-reforms-20170601-gwi0jn.html"]
    @after = after || "2017-06-01"
    @before = before || "2017-06-02"
    @interval = interval || "1h"
  end

  def client
    @client
  end

  def query_es
    @client.search index: 'events', body: 
    {
      query: {
        bool: {
          filter: {
            terms: {
              page_url: @urls
            }
          },
          must: {
            range: {
              derived_tstamp: {
                gte: @after,
                lte: @before
              }
            }
          }
        }
      },
      aggs: {
        hits_per_day: {
          date_histogram: {
            field: "derived_tstamp",
            interval: @interval,
            format: "yyyy-MM-dd HH:mm"
          },
          aggs: {
            hits_per_url: {
              terms: {field: "page_url"}
            }
          }
        }
      }
    }
  end

  def formatted_response
    sites = @urls
    response = query_es
    intervals = []
    sites_hit_count = {}
    data_sets = []
    sites.each {|s| sites_hit_count[s] = []}
    response["aggregations"]["hits_per_day"]["buckets"].each do |interval|
      url_dataset_object = {}
      intervals << interval["key_as_string"]
      sites_hit_count.each do |s, hit_array|
        sites_hit_count[s] << hit_count_for_url(interval["hits_per_url"]["buckets"], s)
      end 
    end

    data_sets = []
    i = 1
    sites_hit_count.each do |site, data|
      site_data_hash = {}
      site_data_hash["label"] = site
      site_data_hash["data"] = data
      site_data_hash["backgroundColor"] = COLOR_ARRAY[COLOR_ARRAY.size % (i+=1)]
      data_sets << site_data_hash
    end

    formatted_object = {}
    formatted_object["labels"] = intervals
    formatted_object["datasets"] = data_sets
    formatted_object.to_json
  end

  def raw_response
    query_es
  end

  def hit_count_for_url(arr, site)
    arr.each do |a|
      return a["doc_count"] if a["key"] == site
    end
    return 0
  end

end