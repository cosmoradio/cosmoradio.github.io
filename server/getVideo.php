$api_key = "API Key"
$video_id = "Video ID"
$url = "https://www.googleapis.com/youtube/v3/videos?id=" . $video_id . "&key=" . $api_key . "&part=snippet,contentDetails,statistics,status";
$json = file_get_contents($url);
$getData = json_decode( $json , true);
foreach((array)$getData['items'] as $key => $gDat){
    $title = $gDat['snippet']['title'];
}
// Output title
echo $title;
