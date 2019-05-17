<?php
/**
 * Check In widget edit view
 */

$widget = elgg_extract('entity', $vars);

echo elgg_view('object/widget/edit/num_display', [
	'entity' => $widget,
	'label' => elgg_echo('checkin:num:checkins'),
	'default' => 4,
]);
