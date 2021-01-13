<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    function index()
    {
    	return Article::all();
    }

    function show($id)
    {
    	return Article::find($id);
    }

    function store(Request $request)
    {
    	return Article::create($request->all());
    }

    function update($id, Request $request)
    {
    	$article = Article::find($id);
    	$article->update($request->all());

    	return $article;
    }

    function delete($id)
    {
    	$article = Article::find($id);
    	$article->delete();

    	return $article;
    }
}
