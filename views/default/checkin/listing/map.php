<?php
/**
 * All checkins map
 *
 * @package checkin
 */

elgg_require_js('checkin/google-maps-site');
$entity = elgg_extract('entity', $vars);

checkin_register_toggle();

$results = elgg_get_entities([
	'type' => 'object',
	'subtype' => 'checkin',
	'no_results' => elgg_echo("checkin:none"),
	'distinct' => false,
]);

$location = [];
if ($results) {
	foreach ($results as $key => $value) {
		$location[$key] = [$value->location];
	}
}

$body .= elgg_format_element('div', ['id' => 'site-map-canvas'], '');
$address = json_encode($location);
$body .= "<script>var getallcheckins = $address;</script>";

echo $body;
