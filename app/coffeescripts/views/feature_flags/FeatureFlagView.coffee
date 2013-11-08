define [
  'Backbone'
  'jst/feature_flags/featureFlag'
], (Backbone, template) ->

  class FeatureFlagView extends Backbone.View

    tagName: 'li'

    className: 'feature-flag'

    template: template

    els:
      '.element_toggler': '$detailToggle'

    events:
      'click button':           'onToggleValue'
      'click .element_toggler': 'onToggleDetails'

    onToggleValue: (e) ->
      @toggleValue($(e.currentTarget))

    onToggleDetails: (e) ->
      @toggleDetailsArrow()

    toggleDetailsArrow: ->
      @$detailToggle.toggleClass('icon-mini-arrow-right')
      @$detailToggle.toggleClass('icon-mini-arrow-down')

    toggleValue: ($target) ->
      $target.siblings().removeClass('active').attr('aria-checked', false)
      $target.addClass('active').attr('aria-checked', true)
      @updateFlag($target.data('action'))

    deleteFlag: ->
      @model.destroy(silent: true)

    updateFlag: (action) ->
      @model.save(state: action)
